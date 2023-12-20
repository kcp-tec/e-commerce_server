const { MercadoPagoConfig, Payment, Customer } = require('mercadopago')
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN })
const payment = new Payment(client)
const customerClient = new Customer(client)

module.exports.createPayment = async body => {
    try {
        let mpCustomer = await searchCustomerByEmail(body.payer.email)

        if (!mpCustomer) {
            await createCustomer(body.payer)
            mpCustomer = await searchCustomerByEmail(body.payer.email)
        }

        return await payment.create({ body })
    } catch (e) {
      console.log(e)
    }
}

const searchCustomerByEmail = async email => {
    const mpCustomer = await customerClient.search({ options: { email } })
    return mpCustomer.results[0]
        ? mpCustomer.results
        : false
}

const createCustomer = async payer => {
    try {
        return await customerClient.create({
            body: {
                email: payer.email,
                first_name: payer.first_name,
                last_name: payer.last_name,
                phone: {
                    area_code: payer.area_code,
                    number: payer.number
                },
                identification: {
                    type: 'CPF',
                    number: payer.identification.number
                },
                default_address: 'Home',
                address: {
                    zip_code: payer.address.zip_code,
                    street_name: payer.address.street_name,
                    street_number: parseInt(payer.address.street_number)
                },
                date_registered: new Date,
                default_card: 'None'
            }
        })
    } catch (e) {
        console.log(e)
    }
}