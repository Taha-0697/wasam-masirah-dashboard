import React from 'react'
import { KTCard } from '../../../../../_metronic/helpers'
import { initialPageRequest } from '../core/_models'
import { PageNewForm } from './PageNewForm'

const PageNew = () => {
    return (
        <KTCard>
            <PageNewForm page={initialPageRequest} />
        </KTCard>
    )
}

export { PageNew }