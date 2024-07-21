export async function POST(req) {
  const { email, password } = await req.json();

  if (email === 'admin@gmail.com' && password === '1234567') {
    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
      status: 401,
    });
  }
}