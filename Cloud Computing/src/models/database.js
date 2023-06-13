const pool = require("../config/database");

const getAllDataUser = async (req, res) => {
  const query = "SELECT * FROM USERDATA";
  return pool.execute(query);
};

const getDataUser = async (id) => {
  const query = `SELECT * FROM USERDATA WHERE ID_USER='${id}'`;
  return pool.execute(query);
};

//UNTUK SIGNUP
const signUp = async (body) => {
  const query = `INSERT INTO USERDATA (NAME, EMAIL, PHONE_NUMBER, PASSWORD) VALUES('${body.NAME}',' ${body.EMAIL}', '${body.PHONE_NUMBER}', '${body.PASSWORD}')`;
  return pool.execute(query);
};

const updateDataUser = async (body, id) => {
  const query = `UPDATE USERDATA SET NAME ='${body.NAME}', EMAIL ='${body.EMAIL}', PHONE_NUMBER = '${body.PHONE_NUMBER}' WHERE ID_USER ='${id}'`;
  return pool.execute(query);
};

const deleteDataUser = async (id) => {
  const query = `DELETE FROM USERDATA WHERE ID_USER =${id}`;
  return pool.execute(query);
};

const sendDataAnak = async (body) => {
  const query = `INSERT INTO DATA_ANAK (ID_USER, CHILD_NAME, GENDER, DATE_OF_BIRTH) VALUES('${body.ID_USER}', '${body.CHILD_NAME}',' ${body.GENDER}', '${body.DATE_OF_BIRTH}')`;
  return pool.execute(query);
};

const getAllDataAnak = async (req, res) => {
  const query = "SELECT * FROM DATA_ANAK";
  return pool.execute(query);
};

const getDataAnak = async (id) => {
  const query = `SELECT * FROM DATA_ANAK WHERE ID_ANAK='${id}'`;
  return pool.execute(query);
};

const updateDataAnak = async (body, id) => {
  const query = `UPDATE DATA_ANAK SET QUISIONER ='${body.QUISIONER}', FACE_DETECTION ='${body.FACE_DETECTION}', POINTS = '${body.POINTS}' WHERE ID_ANAK='${id}'`;
  return pool.execute(query);
};

const deleteDataAnak = async (id) => {
  const query = `DELETE FROM DATA_ANAK WHERE ID_ANAK =${id}`;
  return pool.execute(query);
};

module.exports = {
  getAllDataUser,
  getDataUser,
  updateDataUser,
  deleteDataUser,
  signUp,
  sendDataAnak,
  getAllDataAnak,
  getDataAnak,
  updateDataAnak,
  deleteDataAnak,
};
