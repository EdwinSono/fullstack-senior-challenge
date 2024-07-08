# Kambista Fullstack Senior!

👋 Somos [Kambista](https://kambista.com) y estamos en la búsqueda de un nuevo miembro
para nuestro equipo de tech que nos ayude a seguir ofreciendo la mejor experiencia de
cambio, para esto hemos preparado un reto técnico el cual pueden completar y enviarnos
el resultado con las instrucciones de entrega

## 📓 Caso
Se necesita crear una API interna que registre las solicitudes de cambio de moneda de los clientes.
Como una operación de cambio necesita el TC (tipo de cambio) para poder realizar la conversión de la moneda,
es necesario guardar el tipo de cambio de un proveedor cada 30 segundos.
Se cuenta con la siguiente API para obtener el tipo de cambio de un proveedor:
`https://api.apis.net.pe/v1/tipo-cambio-sunat`

```json
{
  "compra": 3.733,
  "venta": 3.739,
  "origen": "SUNAT",
  "moneda": "USD",
  "fecha": "2024-01-18"
}
```
El endpoint de la API interna debe esperar recibir del cliente la siguiente estructura:
```json
{
  "monedaOrigen": "USD",
  "monedaDestino": "PEN",
  "monto": 100
}
```
Dependiente del sentido de la operación de cambio, se debe calcular el monto de la operación de cambio y guarda
la solicitud de cambio de la siguiente manera:
```json
{
  "id": "xxxxxxxxxxxxx",
  "monedaOrigen": "USD",
  "monedaDestino": "PEN",
  "monto": 100,
  "montoCambiado": 373.3,
  "tipoCambio": 3.733,
  "fecha": "$TIME_STAMP"
}
```
Se debe crear un endpoint para obtener el historial de solicitudes de cambio de un cliente, el cual debe
recibir la fecha de inicio y fin y devolver un conjunto de operacion de la siguiente manera:
```json
[
  {
    "id": "xxxxxxxxxxxxx",
    "monedaOrigen": "USD",
    "monedaDestino": "PEN",
    "monto": 100,
    "montoCambiado": 373.3,
    "tipoCambio": 3.733,
    "fecha": "$TIME_STAMP"
  },
  {
    "id": "xxxxxxxxxxxxx",
    "monedaOrigen": "USD",
    "monedaDestino": "PEN",
    "monto": 100,
    "montoCambiado": 373.3,
    "tipoCambio": 3.733,
    "fecha": "$TIME_STAMP"
  }
]
```
De ser necesario o considerarlo conveniente, se puede agregar algunas validaciones para mantener la consistencia
de los datos y la funcionalidad de la API.

Como siguiente parte del reto es necesario crear una página web por separado con la posibilidad de crear las
operaciones de cambio. Este debe contar con la posibilidad de ingresar:

- Monto a cambiar
- Moneda del monto que va a enviar el cliente
- Moneda del monto que quiere recibir el cliente

Tener en cuentas las siguientes consideraciones:

- Validaciones de error
- Validaciones para no aceptar campos vacios
- Tener la validación del monto que pueda ser con máximo 2 decimales
- Tener la validación que el monto no debe ser mayor a 7 digitos enteros

Para estar parte las tecnologías a utilizar pueden ser las siguientes:

- Vue 3
- Estilos personalizados, [tailwindcss](https://tailwindcss.com/) u otros

El diseño es a elección pero se tendrá muy en cuenta los detalles agregados

## 🖥️ Tecnologías

Para el desarrollo de la solución se debe utilizar las siguientes tecnologías:
- Lenguaje de programación: `NodeJS` con `Typescript`
- Se puede utilizar cualquier framework de NodeJS
- Base de datos: `MongoDB`
- Arquitectura: `Clean Architecture` `DDD`
- La solución debe contar con una batería de pruebas unitarias y/o de integración.
- La API debe estar documentada.
- Es necesario que es dezplegada la parte tanto back como front por separado en alguna nube y tener un deploy automático cuando se integran cambios en la rama principal. Agregar el link público en la documentación.
- Se debe utilizar `Git` para el control de versiones. Se tendrá en cuenta la historia de los cambios.

## 📍 Instruciones de entrega

- Se necesita crear un fork del proyecto y crear un pull request con la solución.
- Es necesario notificar a la persona que te contacto para que revise la solución en el momento de completar la prueba.
- En la siguiente etapa se realizará una entrevista técnica para revisar la solución.
- El tiempo estimado para completar la prueba es de 7 días desde el inicio de la misma.

Quedamos atentos a cualquier consulta adicional, muchos éxitos! 🚀

# App

### Test local
```sh
# READ TRASANCTIONS
curl --location 'http://localhost:3000/transactions?fechaInicio=2024-07-01&fechaFinal=2024-07-30'

# CHANGE CURRENCY
curl --location 'http://localhost:3000/transactions/change-currency' \
--header 'Content-Type: application/json' \
--data '{
  "monedaOrigen": "PEN",
  "monedaDestino": "USD",
  "monto": 100
}
'
```

### Test Server
```sh
# READ TRASANCTIONS
curl --location 'https://5ma4a4rip8.execute-api.us-east-1.amazonaws.com/transactions?fechaInicio=2024-07-01&fechaFinal=2024-07-30'

# CHANGE CURRENCY
curl --location 'https://5ma4a4rip8.execute-api.us-east-1.amazonaws.com/transactions/change-currency' \
--header 'Content-Type: application/json' \
--data '{
  "monedaOrigen": "PEN",
  "monedaDestino": "USD",
  "monto": 100
}
'
```

### Run test

```sh
npm run test
```

### Run Local

```sh
serverless offline start
```

### Deployment

Install dependencies with:

```sh
npm install
```

and then deploy with:

```sh
serverless deploy
```
