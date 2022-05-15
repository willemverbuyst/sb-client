import React, { ReactElement } from 'react'

import TableDeleteConfirmCancelButtons from '../../../../Components/Table/TableDeleteConfirmCancelButtons'

const renderButtonsForAdmin = (
  editModus: boolean,
  toggleEditModus: () => void,
  deletePlayer: () => void
): ReactElement => (
  <TableDeleteConfirmCancelButtons
    editModus={editModus}
    changeEditModus={toggleEditModus}
    handleDelete={deletePlayer}
  />
)

export { renderButtonsForAdmin }
