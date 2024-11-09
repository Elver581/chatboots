const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
//const MockAdapter = require('@bot-whatsapp/database/mock');
const MongoAdapter = require('@bot-whatsapp/database/mongo');
const { delay } = require('@whiskeysockets/baileys');


// Ruta del catálogo en tu proyecto


// Función para enviar un mensaje después de 10 minutos (600000 ms)


// Funciones para cada flujo

const flowAtencionCliente = addKeyword(EVENTS.ACTION) 
    .addAnswer("Hola, sigue el enlace haciendo clic en el siguiente botón:")
    .addAnswer("[📲 *Atención al Cliente*](https://api.whatsapp.com/send?phone=573105083525&text=Hola)")
    .addAnswer("Gracias por comunicarte con Servicio al Cliente. ¿Puedo ayudarte con algo más?")
    .addAnswer("*Para regresar al Menu Principal Digita 9️⃣*")
    
 
    

const flowAreaComercial = addKeyword(EVENTS.ACTION)
    .addAnswer("Área Comercial, sigue el enlace haciendo clic en el siguiente botón:")
    .addAnswer("[💼 *Área Comercial*](https://api.whatsapp.com/send?phone=573145719136&text=Hola)")
    .addAnswer("Gracias por comunicarte con el área comercial. ¿Puedo ayudarte con algo más?")
    .addAnswer("*Para regresar al Menu Principal Digita 9️⃣*");

const flowContabilidad = addKeyword(EVENTS.ACTION)
    .addAnswer("Área de Contabilidad, sigue el enlace haciendo clic en el siguiente botón:")
    .addAnswer("[📊 *Contabilidad*](https://api.whatsapp.com/send?phone=573147302425&text=Hola)")
    .addAnswer("Gracias por comunicarte con el área de contabilidad. ¿Puedo ayudarte con algo más?")
    .addAnswer("*Para regresar al Menu Principal Digita 9️⃣*");
const FlowAdministrativa =addKeyword(EVENTS.ACTION)
    .addAnswer("Área Administrativa, sigue el enlace haciendo clic en el siguiente botón:")
    .addAnswer("[📊 *Admistrativa/Tesoreria*](https://api.whatsapp.com/send?phone=573147294876&text=Hola)")
    .addAnswer("Gracias por comunicarte con el área Administrativa. ¿Puedo ayudarte con algo más?")
    .addAnswer("*Para regresar al Menu Principal Digita 9️⃣*");

const FlowGestionAmbiental = addKeyword(EVENTS.ACTION)
     .addAnswer("Gestión Ambiental, accede haciendo clic en el botón:")
    .addAnswer("[🌍 *Gestión Ambiental*](https://api.whatsapp.com/send?phone=573143630641&text=Hola)")
    .addAnswer("Gracias por comunicarte con el área de gestion ambiental. ¿Puedo ayudarte con algo más?")
    .addAnswer("*Para regresar al Menu Principal Digita 9️⃣*")
const flowCatalogo = addKeyword(EVENTS.ACTION)
    .addAnswer("Aquí puedes ver nuestro catálogo:")
    .addAnswer("[📘 *Ver Catálogo*]",{
        media: "https://setasplast.com.co/assets/Catalogo-Cv4DpgvU.pdf"
    }) // Acceso al archivo de catálogo desde el proyecto
    .addAnswer("Gracias por revisar nuestro catálogo. ¿Puedo ayudarte con algo más?")
    .addAnswer("[💼 *Si estas interasado en uno de nuestros productos sigue el siguiente enlace y contacte con nuestra linea comercial*](https://api.whatsapp.com/send?phone=573145719136&text=Hola)")
    .addAnswer("*Para regresar al Menu Principal Digita 9️⃣*");


const flowPqr = addKeyword(EVENTS.ACTION)
    .addAnswer("Para consultas, puedes enviarnos un correo haciendo clic en el botón:")
    .addAnswer("[✉️ *Enviar Correo*](mailto:servicioalclientesetasplast@gmail.com?)")
    .addAnswer("Gracias por dejarnos tu solicitud. ¿Puedo ayudarte con algo más?")
    .addAnswer("*Para regresar al Menu Principal Digita 9️⃣*");




let timeout; // Variable global para el temporizador

const resetTimeout = (ctx, { gotoFlow }) => {
    if (timeout) clearTimeout(timeout); // Limpiar el temporizador previo
    timeout = setTimeout(() => {
        gotoFlow(flujoFinal); // Ir al flujo de cancelación por inactividad
    },3500000); // 20 segundos de inactividad 7200000
};
// Flujo para manejar las opciones del menú
const menuFlow = addKeyword(["9"])
    .addAnswer(
        [
            '🌐 *Canales de Comunicación*',
            '',
            'Te comparto nuestros canales de comunicación para brindarte una mejor atención:',
            '',
            'Selecciona una *Opción*:',
            '',
            '1️⃣ *Área Comercial*',
            '2️⃣ *Contabilidad*',
            '3️⃣ *Área Administrativa*',
            '4️⃣ *Gestión Ambiental*',
            '5️⃣ *Atención al Cliente*',
            '6️⃣ *PQR*',
            '7️⃣ *Catálogo*',
            '',
            '✏️ Escribe el número correspondiente para continuar.'
        ],
        { capture: true }, // idle: 2000 = 2 segundos
        async (ctx, { gotoFlow, inRef, flowDynamic, fallBack }) => {
            resetTimeout(ctx, { gotoFlow });
            const opcionesValidas = ["1", "2", "3", "4", "5", "6", "7", "9"];
            const seleccion = ctx.body.trim(); // Asegúrate de que no haya espacios en blanco

            if (!opcionesValidas.includes(seleccion)) {
                return fallBack("❌ Respuesta no válida, por favor selecciona una opción válida.");
            }

            switch (seleccion) {
                case "1":
                    return gotoFlow(flowAreaComercial);
                case "2":
                    return gotoFlow(flowContabilidad);
                case "3":
                    return gotoFlow(FlowAdministrativa);
                case "4":
                    return gotoFlow(FlowGestionAmbiental);
                case "5":
                    return gotoFlow(flowAtencionCliente);
                case "6":
                    return gotoFlow(flowPqr);
                case "7":
                    return gotoFlow(flowCatalogo);
                case "9":
                    return; // Volver al menú principal
            }
        }
    );

// Flujo principal de bienvenida
const flowPrincipal = addKeyword("Hola")
.addAnswer("👋 ¡Hola!  Bienvenido a nuestro *Chatbot*  soy *Gaia* tu asesora vitual",{
    media:"./img/logo.png"
})
.addAnswer(

    null,
    async (ctx, { gotoFlow, flowDynamic, }) => {
     // Activar recordatorio de 10 minutos
        return gotoFlow(welcomFlow); // Mostrar el menú directamente
    }
)

const welcomFlow= addKeyword("")

.addAnswer(
    [
        'Somos *SETASPLAST SAS BIC*, especializados en fabricacion y comercialización de productos plásticos *biodegradables* y *100% reciclables* 🌱🌍✨.',
        'Conforme a la ley 1581 de 2012 y decretos reglamentarios sus datos son tratados conforme a nuestra política de protección de datos la cual puede consultar en nuestra página web. ',
        'https://setasplast.com.co',
        'Si continúa con el Chat, autoriza su tratamiento.',
        
        '',
        'A continuación te mostramos nuestras opciones principales:'
        
        
    ], 
    
    null,
    async (ctx, { gotoFlow, flowDynamic }) => {
     // Activar recordatorio de 10 minutos
        return gotoFlow(menuFlow); // Mostrar el menú directamente
    }
    
)
    
const flujoFinal = addKeyword("").addAnswer('Gracias por haber interactuado con nosotros. Si necesitas más información, no dudes en volver a contactarnos. ¡Que tengas un excelente día!');

 


const main = async () => {
    // Asegúrate de que la URI esté bien definida
    require('dotenv').config();

    console.log('MongoDB URI:', process.env.MONGO_DB_URI);

    const adapterDB = new MongoAdapter({
        dbUri: process.env.MONGO_DB_URI,
        dbName: "Setas"
    });

    const adapterFlow = createFlow([menuFlow, flowAtencionCliente, 
        flowAreaComercial, flowContabilidad, flowCatalogo, flowPqr,FlowAdministrativa,FlowGestionAmbiental,welcomFlow,flujoFinal]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();