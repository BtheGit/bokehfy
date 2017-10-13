
describe('bokehfy()', function() {
  before(() => {
    this.bokeh = bokehfy()
  }) 

  it('Should return an object', () => {
    expect(this.bokeh).to.be.an('object')
  })

})