CHALLENGE BACKEND - NodeJs
🚀
<br>
Objetivo
<br>
Desarrollar una API para explorar el mundo de Disney, la cual permitirá conocer y modificar los
personajes que lo componen y entender en qué películas estos participaron. Por otro lado, deberá
exponer la información para que cualquier frontend pueda consumirla.
<br>
👉 Utilizar NodeJs y Express.<br>
👉 No es necesario armar el Frontend.<br>
👉 Las rutas deberán seguir el patrón REST.<br>
👉 Utilizar la librería Sequelize.<br>
⚠ ¡No es indispensable hacer todo!<br>
Mientras más completes, mayor puntaje obtendrás, pero puedes enviar la app hasta el estadío que la
tengas en base a tu conocimiento actual. Recuerda que el objetivo del challenge es entender tu nivel
de conocimiento actual.
<br>
Requerimientos técnicos
<br>
1. Modelado de Base de Datos<br>
●
Personaje: deberá tener,<br>
○
Imagen.<br>
○
Nombre.<br>
○
Edad.<br>
○
Peso.<br>
○
Historia.<br>
○
Películas o series asociadas.<br>
●
Película o Serie: deberá tener,<br>
○
Imagen.<br>
○
Título.<br>
○
Fecha de creación.<br>
○
Calificación (del 1 al 5).<br>
○
Personajes asociados.<br>
●
Género: deberá tener,<br>
○
Nombre.<br>
○
Imagen.<br>
○
Películas o series asociadas.<br>
2. Autenticación de Usuarios<br>
Para realizar peticiones a los endpoints subsiguientes el usuario deberá contar con un token que
obtendrá al autenticarse. Para ello, deberán desarrollarse los endpoints de registro y login, que
permitan obtener el token.<br>
Los endpoints encargados de la autenticación deberán ser:<br>
●
/auth/login<br>
●
/auth/register<br>
3. Listado de Personajes<br>
El listado deberá mostrar:<br>
●
Imagen.<br>
●
Nombre.
El endpoint deberá ser:<br>
●
/characters<br>
4. Creación, Edición y Eliminación de Personajes (CRUD)<br>
Deberán existir las operaciones básicas de creación, edición y eliminación de personajes.
5. Detalle de Personaje<br>
En el detalle deberán listarse todos los atributos del personaje, como así también sus películas o
series relacionadas.<br>
6. Búsqueda de Personajes<br>
Deberá permitir buscar por nombre, y filtrar por edad, peso o películas/series en las que participó.
Para especificar el término de búsqueda o filtros se deberán enviar como parámetros de query:
●
GET /characters?name=nombre<br>
●
GET /characters?age=edad<br>
●
GET /characters?movies=idMovie<br>
7. Listado de Películas<br>
Deberá mostrar solamente los campos imagen, título y fecha de creación.
El endpoint deberá ser:<br>
●
GET /movies<br>
8. Detalle de Película / Serie con sus personajes
Devolverá todos los campos de la película o serie junto a los personajes asociados a la misma<br>
9. Creación, Edición y Eliminación de Película / Serie
Deberán existir las operaciones básicas de creación, edición y eliminación de películas o series.<br>
10.Búsqueda de Películas o Series
Deberá permitir buscar por título, y filtrar por género. Además, permitir ordenar los resultados
por fecha de creación de forma ascendiente o descendiente.<br>
El término de búsqueda, filtro u ordenación se deberán especificar como parámetros de query:<br>
●
GET /movies?name=nombre<br>
●
GET /movies?genre=idGenero<br>
●
GET /movies?order=ASC | DESC<br>
11. Envío de emails<br>
Al registrarse en el sitio, el usuario deberá recibir un email de bienvenida. Es recomendable, la
utilización de algún servicio de terceros como SendGrid.<br>
Documentación<br>
Es deseable documentar los endpoints utilizando alguna herramienta como Postman o
Swagger.<br>
Tests<br>
De forma opcional, se podrán agregar tests de los diferentes endpoints de la APP, verificando
posibles escenarios de error:<br>
●
Campos faltantes o con un formato inválido en BODY de las peticiones<br>
●
Acceso a recursos inexistentes en endpoints de detalle
Los tests pueden realizarse utilizando Mocha + Chai.
