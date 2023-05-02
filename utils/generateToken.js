import jWT from 'jsonwebtoken'

const generateToken = (id )=> {
    return jWT.sign({id}, process.env.JWT_SECRET)

}

export default generateToken