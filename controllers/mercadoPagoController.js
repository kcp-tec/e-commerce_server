const { MercadoPagoConfig, Payment } = require('mercadopago')

module.exports.createPayment = async body => {
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
    const payment = new Payment(client);

    try {
        return await payment.create({ body })
    } catch (e) {
        console.log(e)
    }
}