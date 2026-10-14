import React, { useEffect, useState } from 'react';
import { getAllMissingPersons } from '../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CasesHeader from '../components/cases/CasesHeader';
import CaseCard from '../components/cases/CaseCard';
import CaseDetailsModal from '../components/cases/CaseDetailsModal';
import FoundVerificationModal from '../components/cases/FoundVerificationModal';
import PosterModal from '../components/poster/PosterModal';
import EmptyState from '../components/common/EmptyState';

function Cases() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetCaseId = searchParams.get('id');

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [foundModalPerson, setFoundModalPerson] = useState(null);
  const [posterPerson, setPosterPerson] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = () => {
    getAllMissingPersons()
      .then((res) => setCases(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (targetCaseId && cases.length > 0) {
      const match = cases.find((c) => String(c.id) === String(targetCaseId));
      if (match) {
        setSelectedPerson(match);
      }
    }
  }, [targetCaseId, cases]);

  const handleOpenDetails = (person) => {
    setSelectedPerson(person);
  };

  const handleOpenFoundModal = (person) => {
    setSelectedPerson(null);
    setFoundModalPerson(person);
  };

  const handleFoundSuccess = (personId) => {
    setCases((prev) =>
      prev.map((c) => (c.id === personId ? { ...c, status: 'FOUND' } : c))
    );

    if (selectedPerson && selectedPerson.id === personId) {
      setSelectedPerson((prev) => ({ ...prev, status: 'FOUND' }));
    }

    setFoundModalPerson(null);
    alert('✅ Person marked as FOUND successfully!');
  };

  const filteredCases = cases.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.lastSeenLocation?.toLowerCase().includes(search.toLowerCase()) ||
      c.clothing?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cases-container">
      <CasesHeader
        count={filteredCases.length}
        searchValue={search}
        onSearchChange={setSearch}
      />

      {loading && <p className="cases-status-msg">Loading cases...</p>}

      {!loading && filteredCases.length === 0 && (
        <EmptyState
          title="No missing person reports found."
          buttonText="Report the First Case"
          onButtonClick={() => navigate('/report-missing')}
        />
      )}

      <div className="cases-grid">
        {filteredCases.map((person) => (
          <CaseCard
            key={person.id}
            person={person}
            onViewDetails={handleOpenDetails}
            onMarkFound={handleOpenFoundModal}
          />
        ))}
      </div>

      {selectedPerson && (
        <CaseDetailsModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onMarkFound={handleOpenFoundModal}
          onPrintPoster={(p) => setPosterPerson(p)}
        />
      )}

      {foundModalPerson && (
        <FoundVerificationModal
          person={foundModalPerson}
          onClose={() => setFoundModalPerson(null)}
          onSuccess={handleFoundSuccess}
        />
      )}

      {posterPerson && (
        <PosterModal
          person={posterPerson}
          onClose={() => setPosterPerson(null)}
        />
      )}
    </div>
  );
}

export default Cases;