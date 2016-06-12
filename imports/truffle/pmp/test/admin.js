contract('Admin', function(accounts) {

  it("Create Version of fund factory, called fund version", (done) => {
    var admin = Admin.deployed();
    var version;

    Version.new(admin.address, {from: accounts[0]}).then(function(result) {
      version = result;
      return version.addrMeta();
    }).then((result) => {
      assert.equal(result, admin.address, "Version not linked correctly to Admin!");
      return version.owner();
    }).then((result) => {
      assert.equal(result, accounts[0], "Version not owned by account[0]!");
      return admin.owner();
    }).then((result) => {
      assert.equal(result, accounts[0], "Admin not owned by account[0]!");
    }).then(done).catch(done);
  });

  it("Execute an Update by linking new fund version contract to Admin", (done) => {
    var admin = Admin.deployed();
    var version_v1;
    var version_v2;

    Version.new(admin.address, {from: accounts[0]}).then(function(result) {
      version_v1 = result;
      return result.owner();
    }).then((result) => {
      assert.equal(accounts[0], result, "Owner is not accounts[0]!");
      return Version.new(admin.address, {from: accounts[1]});
    }).then((result) => {
      version_v2 = result;
      return result.owner();
    }).then((result) => {
      assert.equal(accounts[1], result, "Owner is not accounts[1]!");
      // Registrar Version to Meta contract.
      return admin.numVersions();
    }).then((result) => {
      assert.strictEqual(result.toNumber(), 0, "Registrared Versions not 0!");
      return admin.updateVersion(version_v1.address);
    }).then((result) => {
      return admin.updateVersion(version_v2.address);
    }).then((result) => {
      return admin.numVersions();
    }).then((result) => {
      assert.strictEqual(result.toNumber(), 2, "Registrared Versions not 2!");
    }).then(done).catch(done);
  });
});
