require("dotenv").config();

let chai = require("chai");
const { Genero } = require("../src/db");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const { describe, it } = require("mocha");
const url = `http://127.0.0.1:${process.env.PORT}`;
let token = 0;
chai.should();
chai.use(chaiHttp);

describe("Auth", () => {
  describe("test url /Register", () => {
    it("registro usuario", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({
          email: "test@gmail.com",
          clave: "testtest",
          nombre: "prueba en test",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((err, res) => {
          if (err) done();
          token = res.body.token;

          expect(res).to.have.status(201);
          done();
        });
    });
    it("Si existe el correo", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({
          email: "test@gmail.com",
          clave: "testtest",
          nombre: "prueba en test",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((err, res) => {
          if (err) done();
          expect(res.body.error).include("Email ya registrado");
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Si no pasa el correo", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({
          email: "",
          clave: "testtest",
          nombre: "prueba en test",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((err, res) => {
          if (err) done();
          expect(res.body.error).include('"email" is not allowed to be empty');
          expect(res).to.have.status(400);
          done();
        });
    });
    it("Si no pasa el usuario", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({
          email: "test@gmail.com",
          clave: "testtest",
          nombre: "",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((error, response) => {
          if (error) done();

          expect(response.body.error).include(
            '"nombre" is not allowed to be empty'
          );
          expect(response).to.have.status(400);
          done();
        });
    });
  });
  describe("test url /login", () => {
    it("Login de usuario", (done) => {
      chai
        .request(url)
        .post("/auth/login")
        .send({
          email: "test@gmail.com",
          clave: "testtest",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((err, res) => {
          if (err) done();
          token = res.body.token;

          expect(res).to.have.status(201);
          done();
        });
    });
    it("Error Login Email", (done) => {
      chai
        .request(url)
        .post("/auth/login")
        .send({
          email: "",
          clave: "testtest",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((err, res) => {
          if (err) done();
          expect(res.body.error).include("Falto el email");
          expect(res).to.have.status(400);
          done();
        });
    });
    it("Error Login Clave", (done) => {
      chai
        .request(url)
        .post("/auth/login")
        .send({
          email: "test@gmail.com",
          clave: "",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .end((err, res) => {
          if (err) done();

          // expect(res.body.error).include('"clave" is not allowed to be empty')
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
describe("Chacters", () => {
  it("Creacion Personaje", (done) => {
    chai
      .request(url)
      .post("/characters")
      .send({
        nombre: "Capitan America",
        imagen: "Sin imagen",
        edad: "38",
        peso: "75.5",
        historia: "prueba de historia",
      })
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();

        expect(res).to.have.status(201);
        done();
      });
  });
  it("Obteer Personajes", (done) => {
    chai
      .request(url)
      .get("/characters")
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();

        expect(res).to.have.status(200);
        done();
      });
  });

  it("Obtener Detalles Personaje Erroneo por id", (done) => {
    chai
      .request(url)
      .get("/characters/8")
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();

        expect(res).to.have.status(400);
        done();
      });
  });
  it("Obtener Detalles Personaje por id", (done) => {
    chai
      .request(url)
      .get("/characters/1")
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Si existe el Personaje", (done) => {
    chai
      .request(url)
      .post("/characters")
      .send({
        nombre: "Capitan America",
        imagen: "Sin imagen",
        edad: "38",
        peso: "75.5",
        historia: "prueba de historia",
      })
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res.body.error).include(
          "Ya Existe un personaje con este nombre"
        );
        expect(res).to.have.status(400);
        done();
      });
  });
});
describe("Gender", () => {
  it("Registrar Genero", (done) => {
    chai
      .request(url)
      .post("/gender")
      .send({
        nombre: "Terror-prueba",
        imagen: "Sin imagen",
      })
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res.body.msg).include("Genero Creado Exitosamente");
        expect(res).to.have.status(201);
        done();
      });
  });
  it("Si existe el genero", (done) => {
    chai
      .request(url)
      .post("/gender")
      .send({
        nombre: "Terror-prueba",
        imagen: "Sin imagen",
      })
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res.body.error).include("Ya Existe un genero con el nombre");
        expect(res).to.have.status(400);
        done();
      });
  });
  it("Si no pasa datos", (done) => {
    chai
      .request(url)
      .post("/gender")
      .send({
        nombre: "",
        imagen: "",
      })
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res.body.error).include("No pasastes todos los datos");
        expect(res).to.have.status(400);
        done();
      });
  });
  it("Obtener Generos", (done) => {
    chai
      .request(url)
      .get("/gender")
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Eliminar Genero", (done) => {
    chai
      .request(url)
      .delete("/gender/1")
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res.body.msg).include("Se elimino El genero");
        expect(res).to.have.status(201);
        done();
      });
  });
  it("Si no Exite el genero a eliminar", (done) => {
    chai
      .request(url)
      .delete("/gender/1")
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) done();
        expect(res.body.error).include("No existe el genero a eliminar");
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("Movies", () => {
  before( async function() {
    const result = await Genero.create({
    nombre: "Terror-prueba",
    imagen: "Sin imagen"
    })
  });
  it("Crear pelicula", (done) => {
    chai
      .request(url)
      .post("/movies")
      .send({
        imagen: "sin Imagen",
        titulo: "thom hand jerry",
        calificacion: "4",
        creacion: "2022-09-05T20:15:29.679Z",
        genero: "2",
        personaje: ["1"]
      })
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res)=>{
        if(err) done;
        expect(res.body.msg).include("Pelicua creada exitosamente")
        expect(res).to.have.status(200);
        done();
      })

  });
  it("si existe la pelicula", (done) => {
    chai
      .request(url)
      .post("/movies")
      .send({
        imagen: "sin Imagen",
        titulo: "thom hand jerry",
        calificacion: "4",
        creacion: "2022-09-05T20:15:29.679Z",
        genero: "2",
        personaje: ["1"],
      })
      .set("x-access-token", token)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res)=>{
        if(err) done;
        expect(res.body.error).include("ya existe una pelicula con ese nombre")
        expect(res).to.have.status(400);3.
        done();
      })

  });

});
