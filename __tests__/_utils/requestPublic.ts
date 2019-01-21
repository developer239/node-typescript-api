import request from 'supertest'
import app from '~/index'

const publicApp = () => request(app.listen())

export default publicApp
