// Importa los módulos necesarios para la prueba
const request = require("supertest");
const express = require("express");
const checkIsPublicLink = require("../../middlewares/checkIsPublicLink");

// Mockeamos la librería node-fetch para simular las respuestas de las peticiones HTTP
jest.mock("node-fetch"); // Mockeamos la librería node-fetch
const fetch = require("node-fetch");

// Configura la aplicación Express para pruebas
const app = express();
app.use(express.json()); // Para poder parsear el cuerpo JSON de las solicitudes
app.post("/checkIsPublicLink", checkIsPublicLink); // Ruta que usa el middleware checkIsPublicLink

// **Caso de prueba 1: Link válido y público**
/**
 * Caso de prueba para verificar que el middleware devuelva un código de estado 200 si el enlace de Google Drive es público.
 * Este test simula una respuesta con el status 200 de la solicitud HEAD a Google Drive.
 */
test("debería devolver 200 si el enlace es público (status 200)", async () => {
  // Simula una respuesta exitosa (status 200) de Google Drive
  fetch.mockResolvedValue({ status: 200 });

  const res = await request(app)
    .post("/checkIsPublicLink")
    .send({ linkDrive: "https://drive.google.com/file/d/124NLHJCem4fzj6ob3EUuyjh8mf2gBYCX/view?usp=sharing" });

  expect(res.statusCode).toBe(200); // Debe devolver un código de estado 200
  expect(res.body.message).toBe("El enlace de Google Drive es público."); // El mensaje debe indicar que el enlace es público
});

// **Caso de prueba 2: Enlace inválido (sin ID válido)**
/**
 * Caso de prueba para verificar que el middleware devuelva un error 400 si el enlace no contiene un ID válido.
 * Este test simula un enlace sin un ID de archivo válido.
 */
test("debería devolver 400 si el enlace no contiene un ID válido", async () => {
  // Enlace con formato incorrecto (sin ID válido)
  const res = await request(app)
    .post("/checkIsPublicLink")
    .send({ linkDrive: "https://drive.google.com/file/invalid/view?usp=sharing" });

  expect(res.statusCode).toBe(400); // Debe devolver un código de estado 400
  expect(res.body.message).toBe("Enlace de Google Drive inválido."); // El mensaje debe indicar que el enlace es inválido
});

// **Caso de prueba 3: Falta el enlace**
/**
 * Caso de prueba para verificar que el middleware devuelva un error 400 si no se envía el enlace `linkDrive` en la solicitud.
 */
test("debería devolver 400 si no se envía linkDrive", async () => {
  const res = await request(app).post("/checkIsPublicLink").send({}); // No se envía el enlace

  expect(res.statusCode).toBe(400); // Debe devolver un código de estado 400
  expect(res.body.message).toBe("Falta el enlace en la solicitud."); // El mensaje debe indicar que falta el enlace
});

// **Caso de prueba 4: Enlace no público**
/**
 * Caso de prueba para verificar que el middleware devuelva un error 403 si el enlace de Google Drive no es público.
 * Este test simula una respuesta con el status 404, lo que indica que el enlace no es público.
 */
test("debería devolver 403 si el enlace no es público", async () => {
  // Simula una respuesta de Google Drive con status 404 (enlace no público)
  fetch.mockResolvedValue({ status: 404 });

  const res = await request(app)
    .post("/checkIsPublicLink")
    .send({ linkDrive: "https://drive.google.com/file/d/abc123/view" });

  expect(res.statusCode).toBe(403); // Debe devolver un código de estado 403
  expect(res.body.message).toBe("El enlace de Google Drive no es público."); // El mensaje debe indicar que el enlace no es público
});
