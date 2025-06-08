
interface AdSpaceProps {
  position: 'top' | 'middle' | 'sidebar' | 'footer';
  width?: string;
  height?: string;
}

const AdSpace = ({ position, width, height }: AdSpaceProps) => {
  const getDefaultSize = () => {
    switch (position) {
      case 'top':
        return { width: '100%', height: '90px' };
      case 'middle':
        return { width: '100%', height: '250px' };
      case 'sidebar':
        return { width: '300px', height: '600px' };
      case 'footer':
        return { width: '100%', height: '90px' };
      default:
        return { width: '300px', height: '250px' };
    }
  };

  const defaultSize = getDefaultSize();
  const adWidth = width || defaultSize.width;
  const adHeight = height || defaultSize.height;

  return (
    <div className="flex justify-center my-8">
      <div 
        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
        style={{ width: adWidth, height: adHeight }}
      >
        <div className="text-center text-gray-500">
          <p className="text-sm font-medium">Espaço para AdSense</p>
          <p className="text-xs">{adWidth} x {adHeight}</p>
          <p className="text-xs mt-1">Posição: {position}</p>
        </div>
      </div>
    </div>
  );
};

export default AdSpace;
