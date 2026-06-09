import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { NavLink} from 'react-router-dom';
import PdfViewer from "./PdfViewer";
import CommentLike from './ContentLike';

function ContentItem({ content }) {
  let payload = {};
  useEffect(() => {
    try {
      console.log(Cookies.get('userToken'));
      const userToken = Cookies.get('userToken');
      
      if (userToken) {
          payload = jwtDecode(userToken);
          console.log(payload);
      } else {
          throw "no token";
      }
  }
  catch (err) {
      console.log(err);
  }
},[]);
  return (
    <div>
      <p>{content.title}</p>
      <div className="contentViewHeader">
        <div className="contentDescription">
          <p>Description: {content.description}</p>
        </div>
        <CommentLike content={content} />
      </div>
      <div>
        <PdfViewer fileUrl={`${content.fileUrl}`} />
      </div>
      
    </div>
    
  );
}

export default ContentItem;