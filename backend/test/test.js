import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../server.js'

chai.use(chaiHttp)
const expect = chai.expect
describe('Connect one user',()=>{
    it('should connect one of our users',()=>{
        chai.request(app)
        .post('/login')
        .send(
            {
                username:"Gloire",
                password:"1234"
            }
        )
        .end((err,res)=>{
            expect(err).to.be.null;
            expect(res).to.have.status(200)
        })
    })
})