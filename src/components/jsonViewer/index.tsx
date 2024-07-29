import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

interface JsonComponentProps {
    json: object,
    show: boolean,
    setShow: (show: boolean) => void
}

export function JsonComponent(props: JsonComponentProps) {
    return (
        <ReactModal
            isOpen={props.show}
            onRequestClose={()=>props.setShow(false)}
        >
            <JsonView data={props.json}></JsonView>
        </ReactModal>
    )
}