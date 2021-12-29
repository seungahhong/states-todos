import { fetchTodo, createTodo, updateTodo, patchTodo, deleteTodo } from "..";

describe('async api test', () => {
  it('shoud async get api to todos a states', async () => {
    const { data } = await fetchTodo();
    const keys = ['userId', 'id', 'title', 'completed'];
    expect(Object.keys(data[0])).toEqual(keys);
  });

  it('shoud async get api to todo a states', async () => {
    const { data } = await fetchTodo(1);
    const keys = ['userId', 'id', 'title', 'completed'];
    expect(Object.keys(data)).toEqual(keys);
  });

  it('shoud async create api to todos a states', async () => {
    const expectData = {
      "userId": 1,
      "title": 'create',
      "body": 'post create'
    };
    const { data, status } = await createTodo(expectData);

    expect(status).toBe(201/* HTML Response 201 Created */);
    expect({
      userId: data.userId,
      title: data.title,
      body: data.body,
    }).toEqual(expectData);
  });

  it('shoud async put api to todos a states', async () => {
    const expectData = {
      'userId': 1,
      'id': 1,
      'title': 'update',
      'body': 'put update'
    };

    const { data, status } = await updateTodo(1, expectData);

    expect(status).toBe(200/* HTML Response 200 OK */);
    expect(data).toEqual(expectData);
  });

  it('shoud async patch api to todos a states', async () => {
    const expectData = {
      'title': 'patch',
    };

    const { data, status } = await patchTodo(1, expectData);

    expect(status).toBe(200/* HTML Response 200 OK */);
    expect({
      title: data.title,
    }).toEqual(expectData);
  });

  it('shoud async delete api to todos a states', async () => {
    const { status } = await deleteTodo(1);
    expect(status).toBe(200/* HTML Response 200 OK */);
  });
});
