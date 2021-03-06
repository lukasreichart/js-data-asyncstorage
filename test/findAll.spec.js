describe('dsAsyncStorageAdapter#findAll', function () {
  it('should filter users', function (done) {
    var id;

    dsAsyncStorageAdapter.findAll(User, {
      age: 30
    }).then(function (users) {
      assert.equal(users.length, 0);
      return dsAsyncStorageAdapter.create(User, { name: 'John' });
    }).then(function (user) {
      id = user.id;
      return dsAsyncStorageAdapter.findAll(User, {
        name: 'John'
      });
    }).then(function (users) {
      assert.equal(users.length, 1);
      assert.deepEqual(users[0], { id: id, name: 'John' });
      return dsAsyncStorageAdapter.destroy(User, id);
    }).then(function (destroyedUser) {
      assert.isFalse(!!destroyedUser);
      done();
    }).catch(done);
  });
});
