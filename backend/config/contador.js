// const contador = 0;

// const adicionar = async (req, res, next) => {
//     contador += 1;
//     next();
// };

// const contar = () => {
//     return contador;
// };

// module.exports = {
//     adicionar,
//     contar,
// };


module.exports = (middleware) => {
    return (req, res, next) => {

        let contador = 0
        contador += 1;
        middleware(req, res, next);
        console.log(contador)


    };
};