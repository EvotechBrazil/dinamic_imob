# @dinamic/contracts

Interfaces TypeScript:
- Adapters externos: `IPaymentGateway`, `IMessagingProvider`, `IAIProvider`, `ISignatureProvider`, `IStorage`, `IMaps`, `IEmail`
- Cross-module contracts: shape público de cada bounded context

Cada módulo backend só importa daqui — nunca toca internals de outro módulo.

**Status:** placeholder. Implementação na Squad 2 Sprint 1 (módulo auth+tenants) e expandindo a cada sprint.
