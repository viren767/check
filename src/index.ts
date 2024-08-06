import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode,sign,verify  } from 'Hono/jwt'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

console.log("1");

app.post('/app/v1/signup', async (c) => { 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();
  console.log("1");
  console.log(body);
  
  const user = await prisma.user.create({
    data:{
      email:body.email,
      name:body.name,
      password: body.password
    }
  })
  
  console.log("1");
  const token = await sign({id:user.id},c.env.JWT_SECRET)


  console.log("1");
  return c.json({})
})

app.get('/app/v1/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log(prisma);
  const users = await prisma.user.findMany();
  console.log(users);
  return c.text('SignIn Route!')
})

app.get('/app/v1/blog/:id', (c) => {
  return c.text('SignIn Route!')
})

app.post('/app/v1/blog', (c) => {
  return c.text('SignIn Route!')
})

app.get('/app/v1/blog', (c) => {
  return c.text('SignIn Route!')
})

export default app
