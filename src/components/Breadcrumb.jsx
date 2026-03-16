import { ChevronRight, ArrowLeft } from 'lucide-react';

const Breadcrumb = ({ paths, onPathClick }) => {
  return (
    <div className="py-2">
      <nav className="flex items-center text-sm">
        {paths.map((path, index) => (
          <div key={index} className="flex items-center">
            <span 
              onClick={() => onPathClick && onPathClick(path, index)}
              className={`transition-all flex items-center gap-1 ${
                index === paths.length - 1 
                  ? 'text-secondary font-medium' 
                  : 'text-secondary/70 hover:text-primary cursor-pointer'
              }`}
            >
              {path === 'Home' ? (
                <div className="flex items-center gap-1.5 group">
                  <div className="p-1.5 bg-white border border-border rounded-md group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <span className="hidden sm:inline font-medium">Back</span>
                </div>
              ) : (
                path
              )}
            </span>
            {index < paths.length - 1 && (
              <ChevronRight className="w-4 h-4 mx-2 text-secondary/40" />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
