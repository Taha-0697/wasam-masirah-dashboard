import { FC } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; // Bootstrap tooltip components

type Props = {
  roles?: any[];
};

type Role = {
  id: number;
  name: string;
  description: string;
};

const UserRolesCell: FC<Props> = ({ roles }) => {
  if (!roles || roles.length === 0) return <h5>-</h5>;

  // Inline styles for dynamic alignment and spacing
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px', // Spacing between rows
  };

  const rolesStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6c757d', // Muted text
    margin: 0,
    maxWidth: '70%', // Limit width of business roles text
    overflow: 'hidden', // Prevent overflow text
    textOverflow: 'ellipsis', // Add ellipsis for overflow
  };

  const tagsContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start', // Keep the tags aligned to the left
    alignItems: 'center', // Center-align tags vertically
    gap: '2px', // Add gap between tags
    width: '20%', // Limit the space for the roles to ensure they align properly
  };

  const tagStyle: React.CSSProperties = {
    backgroundColor: '#007bff', // Use Bootstrap's primary color
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: 'bold',
    display: 'flex', // Use flexbox for centering
    justifyContent: 'center', // Horizontally center content
    alignItems: 'center', // Vertically center content
    textAlign: 'center', // Align text horizontally in the middle
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {roles.map((item) => (
        <div key={item.id} style={containerStyle}>
          {/* Left-aligned Business roles */}
          <OverlayTrigger
            key={item.id}
            placement='top'
            overlay={<Tooltip id={`tooltip-${item.id}`}>{item.description}</Tooltip>}
          >
            <span style={tagStyle}>{item.name}</span>
          </OverlayTrigger>
        </div>
      ))}
    </div>
  );
};

export { UserRolesCell };
