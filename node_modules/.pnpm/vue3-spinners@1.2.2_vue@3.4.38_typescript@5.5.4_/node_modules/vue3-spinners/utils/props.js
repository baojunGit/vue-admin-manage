export function useSpinnerProps(props) {
    const defaultProps = {
        color: {
            type: String,
            default: '#000000',
        },
    };
    const optionalProps = {
        size: {
            type: [String, Number],
            default: props.size,
        },
        margin: { type: String, default: props.margin },
        height: { type: [String, Number], default: props.height },
        width: { type: [String, Number], default: props.width },
        radius: { type: [String, Number], default: props.radius },
    };
    const actualProps = { ...defaultProps };
    for (const prop of Object.keys(props)) {
        actualProps[prop] = optionalProps[prop];
    }
    return actualProps;
}
