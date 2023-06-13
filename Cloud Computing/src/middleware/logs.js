const middle = (req, res, next) =>{
    console.log('log telah terjadi');
}
const middle2 = (req, res, next) => {
  console.log("log telah terjadi 2");
  next();
};
module.exports = {
    middle,
    middle2,
}