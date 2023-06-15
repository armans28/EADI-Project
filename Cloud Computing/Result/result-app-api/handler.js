const jwt = require('jsonwebtoken');
const { pool } = require('./database');
const { nanoid } = require('nanoid');
const ImgUpload = require('./imgupload');
const axios = require('axios')

const PostResultHandler = async (req, res) => {
  const img = req.body.image;
  const token = req.headers.authorization;
  const questioner_result = req.body.questioner;
  if (!img || !questioner_result) {
    return res.status(400).json({ error: true, message: 'Provide image or fill the questioner' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    const userId = decoded.id;

    const imageurl = await ImgUpload.uploadToGcs(img);
      //axios dibawah dipake kalau ML nya pisah dengan MD
        // Make a request to the OCR API to extract text from the image
    const ocrResponse = await axios.post('https://api.ocr.space/parse/image', {
      apikey: 'YOUR_API_KEY',
      imageUrl: imageUrl,
     isOverlayRequired: true,
    });

    const extractedText = ocrResponse.data.ParsedResults[0].ParsedText;

    const result_id = nanoid.nanoid(16); // Menggunakan nanoid untuk membuat result_id

    const result = {
      userId,
      result_id,
      imageUrl,
      questioner_result,
    };

    pool.query(
      'INSERT INTO result (userId, result_id, image, questioner_result) VALUES (?, ?, ?, ?)',
      [userId, result_id, imageUrl, questioner_result],
      (error) => {
        if (error) {
          console.error('Error inserting result:', error);
          return res.status(500).json({ error: true, message: 'gagal menginput ke database' });
        }

        res.status(201).json({ error: false, message: 'berhasil memasukkan data' });
      }
    );
  } catch (error) {
    return res.status(401).json({ error: true, message: 'token salah' });
  }
};

const GetResultIDHandler = async (req, res) => {
  const { result_id } = req.params;
  const token = req.headers.authorization;
  const face_result = req.body.face;

  if(!face_result){
    return res.status(400).json({error : true, message: 'face_result belum muncul'})
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    const userId = decoded.id;

    const result = {
      userId,
      result_id,
      img,
      questioner_result,
      face_result
    };

    pool.query(
      'INSERT INTO result (userId, result_id, image, questioner_result, face_result) VALUES (?, ?, ?, ?, ?)',
      [userId, result_id, img, questioner_result, face_result],
      (error) => {
        if (error) {
          console.error('Error inserting result:', error);
          return res.status(500).json({ error: true, message: 'gagal menginput ke database' });
        }

        res.status(201).json({ error: false, message: 'berhasil memasukkan data' });
      }
    );


    pool.query(
      'SELECT * FROM results WHERE result_id = ? AND userId = ?',
      [result_id, userId],
      (error, results) => {
        if (error) {
          console.error('Error mengambil note', error);
          return res.status(400).json({ error: true, message: 'hasil tidak ditemukan' });
        }
        const result = results[0];
        res.status(200).json({ error: false, message: 'berhasil melihat data', result });
      }
    );
  } catch (error) {
    return res.status(401).json({ error: true, message: 'token salah' });
  }
};

const getAllResultHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    pool.query(
      'SELECT * FROM result WHERE userId = ?',
      [userId],
      (error, results) => {
        if (error) {
          console.error('Error menampilkan data', error);
          return res.status(500).json({ error: true, message: 'gagal menampilkan data' });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: true, message: 'belum ada data yang diambil' });
        }

        res.status(200).json({ error: false, message: 'Data terlampir', listresult: results });
      }
    );
  } catch (error) {
    return res.status(401).json({ error: true, message: 'token salah' });
  }
};

module.exports = { PostResultHandler, GetResultIDHandler, getAllResultHandler };
