const modelUser = require("../models/database");
const jwt = require("jsonwebtoken");
const getAllDataUser = async (req, res) => {
  try {
    const [data] = await modelUser.getAllDataUser();

    res.json({
      message: "pengambilan data berhasil",
      data: data,
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const getDataUser = async (req, res) => {
  // const {body} = req;
  const { id } = req.params;
  try {
    const [data] = await modelUser.getDataUser(id);
      res.json({
        message: "data berhasil diambil",
        data: data,
      });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const signUp = async (req, res) => {
  const { body } = req;
  try {
    await modelUser.signUp(body);

    res.json({
      message: "penambahan data berhasil",
      data: body,
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const updateDataUser = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    await modelUser.updateDataUser(body, id);

    res.json({
      message: "data berhasil diupdate",
      data: { id: id, ...body },
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};
const deleteDataUser = async (req, res) => {
  const { id } = req.params;
  try {
    await modelUser.deleteDataUser(id);

    res.json({
      message: "data berhasil dihapus",
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const loginUser = (req, res) =>{
  const username = req.body.username;
  const user = { name : username}; 

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '15s'});
  res.json({accessToken : accessToken});
}

// const logoutUser = (req, res)=>{
// }

const sendDataAnak = async (req, res) => {
  const { body } = req;
  try {
    await modelUser.sendDataAnak(body);

    res.json({
      message: "penambahan data berhasil",
      data: body,
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const getDataAnak = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await modelUser.getDataAnak(id);
    res.json({
      message: "data berhasil diambil",
      data: data,
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const updateDataAnak = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    await modelUser.updateDataAnak(body, id);

    res.json({
      message: "data berhasil diupdate",
      data: { id: id, ...body },
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const deleteDataAnak = async (req, res) => {
  const { id } = req.params;
  try {
    await modelUser.deleteDataAnak(id);

    res.json({
      message: "data berhasil dihapus",
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

const getAllDataAnak = async (req, res) => {
  try {
    const [data] = await modelUser.getAllDataAnak();

    res.json({
      message: "pengambilan data berhasil",
      data: data,
    });
  } catch (error) {
    res.json({
      Message: error,
    });
  }
};

module.exports = {
  getAllDataUser,
  getDataUser,
  signUp,
  updateDataUser,
  deleteDataUser,
  loginUser,
  sendDataAnak,
  getAllDataAnak,
  getDataAnak,
  updateDataAnak,
  deleteDataAnak,
};
