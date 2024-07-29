import './style.css'

export function InputCustom (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    return (
        <div
            className="customInput"
        >   
            <label>{props.placeholder}</label>
            <input {...props} placeholder=""/>
        </div>
    )
}