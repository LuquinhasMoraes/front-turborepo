import router from 'next-connect'
import { serializeError } from 'serialize-error'
import helmet from 'helmet'

export function createAPI () {
  const api = router({
    onError: function (err, req, res) {
      res.status(500).json({
        status: 'FAILURE',
        message: serializeError(err)
      })
    },
    onNoMatch: function (req, res) {
      res.status(404).json({
        status: 'FAILURE',
        message: serializeError(new Error('Not found'))
      })
    }
  })
  api.use(helmet())
  return api
}

export function dispatchSuccess (res, message) {
  res.status(200).json({
    status: 'SUCCESS',
    message
  })
}

export function dispatchFailure (res, status, message) {
  res.status(status).json({
    status: 'FAILURE',
    message
  })
}

export function dispatchBadRequest (res, message) {
  res.status(400).json({
    status: 'FAILURE',
    message: serializeError(new Error(`Bad Request. ${message}`))
  })
}

export function createSCIMResource () {
  const api = router({
    onError: function (err, req, res) {
      res.status(500).json({
        schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
        status: 500,
        detail: `[${err.name}] ${err.message}`
      })
    },
    onNoMatch: function (req, res) {
      res.status(404).json({
        schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
        status: 404,
        detail: 'Specified resource or endpoint does not exist.'
      })
    }
  })
  api.use(helmet())
  return api
}

export function dispatchSCIMSuccess (res, payload) {
  res.status(payload.status).json(payload)
}

// https://datatracker.ietf.org/doc/html/rfc7644#section-3.12
export function dispatchSCIMFailure (res, status, optionals) {
  res.status(status).json(
    Object.assign(
      {
        schemas: ['urn:ietf:params:scim:api:messages:2.0:Error'],
        status: status
      },
      optionals
    )
  )
}
