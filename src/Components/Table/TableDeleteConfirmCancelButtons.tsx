import { IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import React, { ReactElement } from 'react'

import TableButton from '../Button/TableButton'

type IProps = {
  editModus: boolean
  changeEditModus: () => void
  handleDelete: () => void
}

const TableDeleteConfirmCancelButtons: React.FC<IProps> = ({
  editModus,
  changeEditModus,
  handleDelete,
}: IProps): ReactElement | null =>
  editModus ? (
    <>
      <TableButton
        caption="CONFIRM"
        color="secondary"
        handleClick={handleDelete}
      />
      <TableButton
        caption="CANCEL"
        color="primary"
        handleClick={changeEditModus}
      />
    </>
  ) : (
    <IconButton aria-label="delete" color="secondary" onClick={changeEditModus}>
      <DeleteForeverIcon />
    </IconButton>
  )

export default TableDeleteConfirmCancelButtons
