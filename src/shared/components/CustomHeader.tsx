interface CustomHeaderProps {
    title: string;
    description?: string;
}

function CustomHeader({title, description}: CustomHeaderProps) {
    return (
        <div className="content-center">
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </div>
    );
}

export default CustomHeader;