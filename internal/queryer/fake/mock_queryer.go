// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/vmware-tanzu/octant/internal/queryer (interfaces: Queryer)

// Package fake is a generated GoMock package.
package fake

import (
	context "context"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	v1 "k8s.io/api/admissionregistration/v1"
	v10 "k8s.io/api/autoscaling/v1"
	v11 "k8s.io/api/core/v1"
	v1beta1 "k8s.io/api/extensions/v1beta1"
	v12 "k8s.io/apimachinery/pkg/apis/meta/v1"
	unstructured "k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	v13 "k8s.io/kube-aggregator/pkg/apis/apiregistration/v1"
)

// MockQueryer is a mock of Queryer interface
type MockQueryer struct {
	ctrl     *gomock.Controller
	recorder *MockQueryerMockRecorder
}

// MockQueryerMockRecorder is the mock recorder for MockQueryer
type MockQueryerMockRecorder struct {
	mock *MockQueryer
}

// NewMockQueryer creates a new mock instance
func NewMockQueryer(ctrl *gomock.Controller) *MockQueryer {
	mock := &MockQueryer{ctrl: ctrl}
	mock.recorder = &MockQueryerMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockQueryer) EXPECT() *MockQueryerMockRecorder {
	return m.recorder
}

// APIServicesForService mocks base method
func (m *MockQueryer) APIServicesForService(arg0 context.Context, arg1 *v11.Service) ([]*v13.APIService, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "APIServicesForService", arg0, arg1)
	ret0, _ := ret[0].([]*v13.APIService)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// APIServicesForService indicates an expected call of APIServicesForService
func (mr *MockQueryerMockRecorder) APIServicesForService(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "APIServicesForService", reflect.TypeOf((*MockQueryer)(nil).APIServicesForService), arg0, arg1)
}

// Children mocks base method
func (m *MockQueryer) Children(arg0 context.Context, arg1 *unstructured.Unstructured) (*unstructured.UnstructuredList, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Children", arg0, arg1)
	ret0, _ := ret[0].(*unstructured.UnstructuredList)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Children indicates an expected call of Children
func (mr *MockQueryerMockRecorder) Children(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Children", reflect.TypeOf((*MockQueryer)(nil).Children), arg0, arg1)
}

// ConfigMapsForPod mocks base method
func (m *MockQueryer) ConfigMapsForPod(arg0 context.Context, arg1 *v11.Pod) ([]*v11.ConfigMap, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ConfigMapsForPod", arg0, arg1)
	ret0, _ := ret[0].([]*v11.ConfigMap)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ConfigMapsForPod indicates an expected call of ConfigMapsForPod
func (mr *MockQueryerMockRecorder) ConfigMapsForPod(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ConfigMapsForPod", reflect.TypeOf((*MockQueryer)(nil).ConfigMapsForPod), arg0, arg1)
}

// Events mocks base method
func (m *MockQueryer) Events(arg0 context.Context, arg1 v12.Object) ([]*v11.Event, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Events", arg0, arg1)
	ret0, _ := ret[0].([]*v11.Event)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Events indicates an expected call of Events
func (mr *MockQueryerMockRecorder) Events(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Events", reflect.TypeOf((*MockQueryer)(nil).Events), arg0, arg1)
}

// IngressesForService mocks base method
func (m *MockQueryer) IngressesForService(arg0 context.Context, arg1 *v11.Service) ([]*v1beta1.Ingress, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "IngressesForService", arg0, arg1)
	ret0, _ := ret[0].([]*v1beta1.Ingress)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// IngressesForService indicates an expected call of IngressesForService
func (mr *MockQueryerMockRecorder) IngressesForService(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "IngressesForService", reflect.TypeOf((*MockQueryer)(nil).IngressesForService), arg0, arg1)
}

// MutatingWebhookConfigurationsForService mocks base method
func (m *MockQueryer) MutatingWebhookConfigurationsForService(arg0 context.Context, arg1 *v11.Service) ([]*v1.MutatingWebhookConfiguration, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "MutatingWebhookConfigurationsForService", arg0, arg1)
	ret0, _ := ret[0].([]*v1.MutatingWebhookConfiguration)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// MutatingWebhookConfigurationsForService indicates an expected call of MutatingWebhookConfigurationsForService
func (mr *MockQueryerMockRecorder) MutatingWebhookConfigurationsForService(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "MutatingWebhookConfigurationsForService", reflect.TypeOf((*MockQueryer)(nil).MutatingWebhookConfigurationsForService), arg0, arg1)
}

// OwnerReference mocks base method
func (m *MockQueryer) OwnerReference(arg0 context.Context, arg1 *unstructured.Unstructured) (bool, []*unstructured.Unstructured, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "OwnerReference", arg0, arg1)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].([]*unstructured.Unstructured)
	ret2, _ := ret[2].(error)
	return ret0, ret1, ret2
}

// OwnerReference indicates an expected call of OwnerReference
func (mr *MockQueryerMockRecorder) OwnerReference(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "OwnerReference", reflect.TypeOf((*MockQueryer)(nil).OwnerReference), arg0, arg1)
}

// PersistentVolumeClaimsForPod mocks base method
func (m *MockQueryer) PersistentVolumeClaimsForPod(arg0 context.Context, arg1 *v11.Pod) ([]*v11.PersistentVolumeClaim, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "PersistentVolumeClaimsForPod", arg0, arg1)
	ret0, _ := ret[0].([]*v11.PersistentVolumeClaim)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// PersistentVolumeClaimsForPod indicates an expected call of PersistentVolumeClaimsForPod
func (mr *MockQueryerMockRecorder) PersistentVolumeClaimsForPod(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "PersistentVolumeClaimsForPod", reflect.TypeOf((*MockQueryer)(nil).PersistentVolumeClaimsForPod), arg0, arg1)
}

// PodsForService mocks base method
func (m *MockQueryer) PodsForService(arg0 context.Context, arg1 *v11.Service) ([]*v11.Pod, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "PodsForService", arg0, arg1)
	ret0, _ := ret[0].([]*v11.Pod)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// PodsForService indicates an expected call of PodsForService
func (mr *MockQueryerMockRecorder) PodsForService(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "PodsForService", reflect.TypeOf((*MockQueryer)(nil).PodsForService), arg0, arg1)
}

// ScaleTarget mocks base method
func (m *MockQueryer) ScaleTarget(arg0 context.Context, arg1 *v10.HorizontalPodAutoscaler) (map[string]interface{}, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ScaleTarget", arg0, arg1)
	ret0, _ := ret[0].(map[string]interface{})
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ScaleTarget indicates an expected call of ScaleTarget
func (mr *MockQueryerMockRecorder) ScaleTarget(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ScaleTarget", reflect.TypeOf((*MockQueryer)(nil).ScaleTarget), arg0, arg1)
}

// SecretsForPod mocks base method
func (m *MockQueryer) SecretsForPod(arg0 context.Context, arg1 *v11.Pod) ([]*v11.Secret, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SecretsForPod", arg0, arg1)
	ret0, _ := ret[0].([]*v11.Secret)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// SecretsForPod indicates an expected call of SecretsForPod
func (mr *MockQueryerMockRecorder) SecretsForPod(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SecretsForPod", reflect.TypeOf((*MockQueryer)(nil).SecretsForPod), arg0, arg1)
}

// ServiceAccountForPod mocks base method
func (m *MockQueryer) ServiceAccountForPod(arg0 context.Context, arg1 *v11.Pod) (*v11.ServiceAccount, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ServiceAccountForPod", arg0, arg1)
	ret0, _ := ret[0].(*v11.ServiceAccount)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ServiceAccountForPod indicates an expected call of ServiceAccountForPod
func (mr *MockQueryerMockRecorder) ServiceAccountForPod(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ServiceAccountForPod", reflect.TypeOf((*MockQueryer)(nil).ServiceAccountForPod), arg0, arg1)
}

// ServicesForIngress mocks base method
func (m *MockQueryer) ServicesForIngress(arg0 context.Context, arg1 *v1beta1.Ingress) (*unstructured.UnstructuredList, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ServicesForIngress", arg0, arg1)
	ret0, _ := ret[0].(*unstructured.UnstructuredList)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ServicesForIngress indicates an expected call of ServicesForIngress
func (mr *MockQueryerMockRecorder) ServicesForIngress(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ServicesForIngress", reflect.TypeOf((*MockQueryer)(nil).ServicesForIngress), arg0, arg1)
}

// ServicesForPod mocks base method
func (m *MockQueryer) ServicesForPod(arg0 context.Context, arg1 *v11.Pod) ([]*v11.Service, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ServicesForPod", arg0, arg1)
	ret0, _ := ret[0].([]*v11.Service)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ServicesForPod indicates an expected call of ServicesForPod
func (mr *MockQueryerMockRecorder) ServicesForPod(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ServicesForPod", reflect.TypeOf((*MockQueryer)(nil).ServicesForPod), arg0, arg1)
}

// ValidatingWebhookConfigurationsForService mocks base method
func (m *MockQueryer) ValidatingWebhookConfigurationsForService(arg0 context.Context, arg1 *v11.Service) ([]*v1.ValidatingWebhookConfiguration, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ValidatingWebhookConfigurationsForService", arg0, arg1)
	ret0, _ := ret[0].([]*v1.ValidatingWebhookConfiguration)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ValidatingWebhookConfigurationsForService indicates an expected call of ValidatingWebhookConfigurationsForService
func (mr *MockQueryerMockRecorder) ValidatingWebhookConfigurationsForService(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ValidatingWebhookConfigurationsForService", reflect.TypeOf((*MockQueryer)(nil).ValidatingWebhookConfigurationsForService), arg0, arg1)
}
