import React from 'react';

const Uploads = () => (
  <form
    action="https://sagui-api.herokuapp.com/backoffice/gto/uploadfiles"
    method="post"
    encType="multipart/form-data"
  >
    <div className="form-group">
      <div className="col-md-10">
        <p>Upload one or more files using this form:</p>
        <input type="file" name="files" multiple />
      </div>
    </div>
    <div className="form-group">
      <div className="col-md-10">
        <button type="submit">Enviar</button>
      </div>
    </div>
  </form>
);

export default Uploads;
