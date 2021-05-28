import React, { ReactElement } from 'react';

import TableEditCancelButtons from '../../../../Components/Table/TableEditCancelButtons';

const renderButtonsForAdmin = (
  editModus: boolean,
  toggleEditModus: () => void,
  deletePlayer: () => void,
): ReactElement => {
  return <TableEditCancelButtons editModus={editModus} changeEditModus={toggleEditModus} handleDelete={deletePlayer} />;
};

export default renderButtonsForAdmin;
