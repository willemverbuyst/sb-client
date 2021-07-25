import React, { ReactElement } from 'react';

import TableButton from '../Button/TableButton';

type IProps = {
  editModus: boolean;
  changeEditModus: () => void;
  handleDelete: () => void;
};

const TableDeleteConfirmCancelButtons: React.FC<IProps> = ({
  editModus,
  changeEditModus,
  handleDelete,
}: IProps): ReactElement | null => {
  return editModus ? (
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
    <TableButton
      caption="DELETE"
      color="primary"
      handleClick={changeEditModus}
    />
  );
};

export default TableDeleteConfirmCancelButtons;
