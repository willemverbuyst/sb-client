import React, { ReactElement } from 'react';

import TableButton from './TableButton';

type IProps = {
  editModus: boolean;
  changeEditModus: () => void;
  handleDelete: () => void;
};

const TableEditCancelButtons: React.FC<IProps> = ({
  editModus,
  changeEditModus,
  handleDelete,
}: IProps): ReactElement | null => {
  return editModus ? (
    <>
      <TableButton caption="DELETE" color="secondary" handleClick={handleDelete} />
      <TableButton caption="CANCEL" color="primary" handleClick={changeEditModus} />
    </>
  ) : (
    <TableButton caption="EDIT" color="primary" handleClick={changeEditModus} />
  );
};

export default TableEditCancelButtons;
