import { useState, useEffect } from 'react';
import icPoint from '@/assets/common/icPoint.svg'; 
import styles from './PointBadge.module.css';

function PointBadge({ studyID = 123 }) {
  const [points, setPoints] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


}

export default PointBadge;
