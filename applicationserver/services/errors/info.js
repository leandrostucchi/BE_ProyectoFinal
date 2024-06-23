export const generateUserErrorInfo = (user) =>{
    return `Uno de los campos ingresados es invalido
    Para el nombre ${user.first_name}
    Apellido ${user.last_name}
    Email ${user.email}`
}
