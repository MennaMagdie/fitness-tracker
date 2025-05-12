import React, { useEffect, useState } from 'react';
import { getProgress } from '../services/api';

interface ProgressData {
  date: string;
  weight: number;
  bodyFat: number | null;
  measurements: {
    chest: number | null;
    waist: number | null;
    hips: number | null;
    arms: number | null;
    thighs: number | null;
  };
  notes: string;
  photos: string[];
}

const Progress: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProgress();
        setProgressData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch progress data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Progress Tracking</h1>

      {/* Progress Timeline */}
      <div className="space-y-6">
        {progressData.map((entry, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">
                {new Date(entry.date).toLocaleDateString()}
              </h2>
            </div>

            {/* Weight and Body Fat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-600">Weight</h3>
                <p className="text-2xl font-bold">{entry.weight} kg</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-600">Body Fat</h3>
                <p className="text-2xl font-bold">
                  {entry.bodyFat ? `${entry.bodyFat}%` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Measurements */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-600 mb-2">Measurements</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Chest</p>
                  <p className="font-semibold">{entry.measurements.chest || 'N/A'} cm</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Waist</p>
                  <p className="font-semibold">{entry.measurements.waist || 'N/A'} cm</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Hips</p>
                  <p className="font-semibold">{entry.measurements.hips || 'N/A'} cm</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Arms</p>
                  <p className="font-semibold">{entry.measurements.arms || 'N/A'} cm</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Thighs</p>
                  <p className="font-semibold">{entry.measurements.thighs || 'N/A'} cm</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {entry.notes && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Notes</h3>
                <p className="text-gray-700">{entry.notes}</p>
              </div>
            )}

            {/* Photos */}
            {entry.photos.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {entry.photos.map((photo, photoIndex) => (
                    <div key={photoIndex} className="aspect-w-1 aspect-h-1">
                      <img
                        src={photo}
                        alt={`Progress photo ${photoIndex + 1}`}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress; 