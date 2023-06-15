const modelUser = require("../models/database");
const jwt = require("../middleware/logs");
const bcrypt = require("bcrypt");

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
  // const { body } = req;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.PASSWORD, salt);
  const data = {
    NAME: req.body.NAME,
    EMAIL: req.body.EMAIL,
    PHONE_NUMBER: req.body.PHONE_NUMBER,
    PASSWORD: hashedPassword,
  };
  try {
    await modelUser.signUp(data);

    res.json({
      message: "penambahan data berhasil",
      data: data,
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

const loginUser = async(req, res) => {
  const email = req.body.EMAIL;
  const password = req.body.PASSWORD;
  const data = { EMAIL: email, PASSWORD: password };

  try {
    const user = await modelUser.getEmailUser(req.body.EMAIL);

    if (user.statusCode === 200) {
      console.log(1);
      console.log(
        data.PASSWORD,
        user.data.PASSWORD
      );
      const validPassword = await bcrypt.compare(
        data.PASSWORD,
        user.data.PASSWORD
      );
      console.log(2);

      if (!validPassword) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid email or password" });
      }
      console.log(3);
      const token = jwt.generateToken(user.data);
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Login success!",
        data: {
          ID: user.data.ID,
          NAME: user.data.NAME,
          EMAIL: user.data.EMAIL,
          PHONE_NUMBER: user.data.PHONE_NUMBER,
        },
        token: token,
      });
    }
    return res
      .status(404)
      .send({ status: false, message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
  res.json({ accessToken: accessToken });
};

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
