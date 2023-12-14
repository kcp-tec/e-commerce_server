module.exports.createPurchase = async ({ products, user, installments }) => {
    const mercadopago = require('mercadopago')

    mercadopago.configure({
        access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
    })

    // product = title, currency_id: 'BRL', picture_url, description, category_id: nome_categoria, quantity, unit_price

    // user = name, surname, email, phone: {area_code, number}, identification: {type: 'cpf', number}, address: {street_name, street_number, zip_code}

    let preference = {
        items: products,
        payer: user,
        back_urls: {
            success: 'https://www.success.com',
            failure: 'http://www.failure.com',
            pending: 'http://www.pending.com'
        },
        auto_return: 'approved',
        payment_methods: {
            excluded_payment_methods: [],
            excluded_payment_types: [],
            installments: installments
        },
        statement_descriptor: 'E-commerce',
        external_reference: 'Reference_1234',
        expires: true,
        expiration_date_from: Date.now(),
        expiration_date_to: Date.now().getTime() * 60000
    }

    const res = await mercadopago.preferences.create(preference)

    return res.body.id
}