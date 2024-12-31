

import React from 'react';

interface EditTodoModalProps {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

class EditTodoModal extends React.Component<EditTodoModalProps> {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '4px'
          }}
        >
          <h3>Edit Todo</h3>
          <input
            type="text"
            value={this.props.text}
            onChange={this.props.onChange}
          />
          <div>
            <button onClick={this.props.onSave}>Save</button>
            <button onClick={this.props.onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
export default EditTodoModal;