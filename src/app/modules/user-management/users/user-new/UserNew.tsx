import React from 'react'
import { KTCard } from '../../../../../_metronic/helpers'
import { UserNewForm } from './UserNewForm'
import { initialUser } from '../core/_models'

const UserNew = () => {
  return (
    <KTCard>
      <UserNewForm  />
    </KTCard>
  )
}

export { UserNew }