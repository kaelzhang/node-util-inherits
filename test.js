const inherits = require('.')
const test = require('ava')


test('basic', t => {
  function A () {
    this.a = 1
  }

  A.prototype.a = 2

  function B () {}

  inherits(B, A)

  t.is(new B().a, 2, 'should abandon A.constructor')
  t.is(B.super_, A, 'super_')
})


test('fake prototype', t => {
  const A = {
    prototype: {
      a: 2
    }
  }

  function B () {}

  inherits(B, A)
  t.is(new B().a, 2, 'inherits')
  t.is(B.super_, A, 'super_')
})



test('throw', t => {
  function A () {}

  function B () {}

  t.throws(() => {
    inherits(undefined, A)
  }, TypeError)

  t.throws(() => {
    inherits(null, A)
  }, TypeError)

  t.throws(() => {
    inherits(B)
  }, TypeError)

  t.throws(() => {
    inherits(B, null)
  }, TypeError)

  t.throws(() => {
    inherits(B, {})
  }, TypeError)
})
