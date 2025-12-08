async function run() {
  const base = 'http://localhost:3000';
  const log = (title, data) => {
    console.log('\n== ' + title + ' ==');
    try { console.log(JSON.stringify(data, null, 2)); } catch { console.log(data); }
  };

  try {
    const r1 = await fetch(base + '/tasks');
    log('GET /tasks', await r1.json().catch(() => r1.text()));

    const r2 = await fetch(base + '/tasks', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: 'Tester', text: 'Tarea desde node script', completed: false })
    });
    log('POST /tasks', await r2.json().catch(() => r2.text()));

    const r3 = await fetch(base + '/tasks');
    log('GET /tasks (after create)', await r3.json().catch(() => r3.text()));

    const reg = await fetch(base + '/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'tester', email: 'tester@local.test', password: 'secret' })
    });
    log('POST /auth/register', await reg.json().catch(() => reg.text()));

    const login = await fetch(base + '/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'tester', password: 'secret' })
    });
    log('POST /auth/login', await login.json().catch(() => login.text()));

    const users = await fetch(base + '/users');
    log('GET /users', await users.json().catch(() => users.text()));

    const teamPost = await fetch(base + '/teams', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'TeamTest', description: 'Equipo de prueba' })
    });
    log('POST /teams', await teamPost.json().catch(() => teamPost.text()));

    const teams = await fetch(base + '/teams');
    log('GET /teams', await teams.json().catch(() => teams.text()));

  } catch (e) {
    console.error('ERROR running tests:', e.message || e);
  }
}

run();
