/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Modal from './modal';
import ToolbarButton from './toolbar-button';

/**
 * IconPicker Component
 *
 * A component that allows users to pick an SVG icon using a toolbar button
 * and modal interface. It manages the open/close state of the modal and
 * the SVG code selected.
 *
 * @param {Object} props                 - Component props.
 * @param {Object} props.attributes      - The block attributes.
 * @param {Function} props.setAttributes - Function to update block attributes.
 *
 * @returns {JSX.Element} The rendered IconPicker component.
 */
function IconPicker({
    attributes,
    setAttributes
}) {
    const [isOpen, setOpen] = useState(false);
    const [svgCode, setSvgCode] = useState('');

    return (
        <>
            <ToolbarButton
                attributes={attributes}
                setAttributes={setAttributes}
                setOpen={setOpen}
                setSvgCode={setSvgCode}
            />
            <Modal
                attributes={attributes}
                setAttributes={setAttributes}
                isOpen={isOpen}
                setOpen={setOpen}
                setSvgCode={setSvgCode}
                svgCode={svgCode}
            />
        </>
    );
};

export default IconPicker;