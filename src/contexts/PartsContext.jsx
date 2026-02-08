import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { clientAuth } from '../lib/supabasePersonalization';

const PartsContext = createContext();

const STORAGE_KEY = 'ifs_shared_parts';

const defaultSelfPart = {
  id: 'self-1',
  type: 'self',
  name: 'Self',
  x: 300,
  y: 200,
  size: 80,
  notes: 'Your core essence - calm, curious, compassionate',
  role: 'Core compassionate essence',
  createdAt: new Date().toISOString()
};

function migrateLegacyParts() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return JSON.parse(existing);

  const studioData = localStorage.getItem('partsStudioData');
  const mappingData = localStorage.getItem('mappedParts');

  const partsMap = {};
  partsMap[defaultSelfPart.id] = defaultSelfPart;

  if (studioData) {
    try {
      const studioParts = JSON.parse(studioData);
      studioParts.forEach(p => {
        if (p.id === 'self-1') {
          partsMap[p.id] = { ...defaultSelfPart, ...p };
        } else {
          partsMap[p.id] = {
            ...p,
            role: p.role || p.notes || '',
            x: p.x || 100 + Math.random() * 400,
            y: p.y || 100 + Math.random() * 200,
            size: p.size || 60,
            createdAt: p.createdAt || new Date().toISOString()
          };
        }
      });
    } catch (e) { /* ignore */ }
  }

  if (mappingData) {
    try {
      const mappingParts = JSON.parse(mappingData);
      mappingParts.forEach(p => {
        if (!partsMap[p.id]) {
          partsMap[p.id] = {
            ...p,
            x: p.x || 100 + Math.random() * 400,
            y: p.y || 100 + Math.random() * 200,
            size: p.size || 60,
            notes: p.notes || p.role || '',
            createdAt: p.createdAt || new Date().toISOString()
          };
        }
      });
    } catch (e) { /* ignore */ }
  }

  const merged = Object.values(partsMap);
  if (merged.length === 0) return [defaultSelfPart];
  return merged;
}

export const PartsProvider = ({ children }) => {
  const [parts, setParts] = useState(() => migrateLegacyParts());
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parts));
    localStorage.setItem('partsStudioData', JSON.stringify(parts));
    localStorage.setItem('mappedParts', JSON.stringify(parts.filter(p => p.type !== 'self')));
  }, [parts]);

  const addPart = useCallback((partData) => {
    const newPart = {
      id: `${partData.type}-${Date.now()}`,
      x: 100 + Math.random() * 400,
      y: 100 + Math.random() * 200,
      size: 60,
      notes: '',
      role: '',
      createdAt: new Date().toISOString(),
      ...partData
    };
    setParts(prev => [...prev, newPart]);
    return newPart;
  }, []);

  const updatePart = useCallback((id, updates) => {
    setParts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deletePart = useCallback((id) => {
    if (id === 'self-1') return;
    setParts(prev => prev.filter(p => p.id !== id));
  }, []);

  const getPartsByType = useCallback((type) => {
    return parts.filter(p => p.type === type);
  }, [parts]);

  const saveToSupabase = useCallback(async () => {
    try {
      const client = clientAuth.getCurrentClientValidated();
      if (!client) return;

      const { error } = await supabase
        .from('ifs_interactive_data')
        .upsert({
          client_id: client.id,
          module_id: 'parts_map',
          data: { parts },
          updated_at: new Date().toISOString()
        }, { onConflict: 'client_id,module_id' });

      if (!error) {
        setLastSaved(new Date().toISOString());
      }
    } catch (e) {
      console.error('Error saving parts to Supabase:', e);
    }
  }, [parts]);

  const loadFromSupabase = useCallback(async () => {
    try {
      const client = clientAuth.getCurrentClientValidated();
      if (!client) return;

      const { data, error } = await supabase
        .from('ifs_interactive_data')
        .select('data')
        .eq('client_id', client.id)
        .eq('module_id', 'parts_map')
        .single();

      if (!error && data?.data?.parts) {
        setParts(data.data.parts);
      }
    } catch (e) {
      console.error('Error loading parts from Supabase:', e);
    }
  }, []);

  const value = {
    parts,
    setParts,
    addPart,
    updatePart,
    deletePart,
    getPartsByType,
    saveToSupabase,
    loadFromSupabase,
    lastSaved
  };

  return (
    <PartsContext.Provider value={value}>
      {children}
    </PartsContext.Provider>
  );
};

export const useParts = () => {
  const context = useContext(PartsContext);
  if (!context) {
    throw new Error('useParts must be used within a PartsProvider');
  }
  return context;
};

export default PartsContext;
