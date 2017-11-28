import React, {Component} from 'react';

class ProfileModal extends React.Component {
    constructor(props) {
      super(props);
      this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    componentDidMount() {
        const { handleModalCloseClick } = this.props;
        // $(this.modal).modal('show');
        // $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
    }

    handleCloseClick() {
      const { handleModalCloseClick } = this.props;
    //   $(this.modal).modal('hide');
      handleModalCloseClick();
    }

    render() {
      return (
        <div>
            <div className="modal fade" ref={modal => this.modal = modal} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        Modal Body
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseClick}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }

  export default ProfileModal; 