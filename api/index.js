import axios from "axios";
let token =
  "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";

export default axios.create({
  //Note: Declarare en este archivo la ruta base que se utilizara en el proyecto
  baseURL: "https://ecsdevapi.nextline.mx/vdev/tasks-challenge",
  timeout: 15000,

  headers: {
    //Note: Declaro token para respuestas exitosas
    Authorization: `Bearer ${token}`,
  },
});
