import { storiesOf } from '@storybook/angular';
import { object } from '@storybook/addon-knobs';
import { StructuredLogsComponent } from '../app/modules/shared/components/smart/structured-logs/structured.logs.component';

const logs= [
  {"level":"info","ts":"2020-07-07T18:56:36.371Z","logger":"controller","caller":"webhook/admission.go:104","msg":"AdmissionReview for v1.GroupVersionKind{Group:\"\", Version:\"v1\", Kind:\"ConfigMap\"}: mink-system/leader-elect-internal response={ UID: \"\", Allowed: true, Status: (*v1.Status)(nil), Patch: , PatchType: , AuditAnnotations: map[string]string(nil)}","commit":"6fd8a62","knative.dev/kind":"/v1, Kind=ConfigMap","knative.dev/namespace":"mink-system","knative.dev/name":"leader-elect-internal","knative.dev/operation":"UPDATE","knative.dev/resource":"/v1, Resource=configmaps","knative.dev/subresource":"","knative.dev/userinfo":"{system:serviceaccount:mink-system:controller dc0c307a-78be-4d7b-a3a6-c603dc74d640 [system:serviceaccounts system:serviceaccounts:mink-system system:authenticated] map[]}"},
  {"level":"info","ts":"2020-07-07T18:56:36.504Z","logger":"controller","caller":"webhook/admission.go:72","msg":"Webhook ServeHTTP request=&http.Request{Method:\"POST\", URL:(*url.URL)(0xc002404800), Proto:\"HTTP/1.1\", ProtoMajor:1, ProtoMinor:1, Header:http.Header{\"Accept\":[]string{\"application/json, */*\"}, \"Accept-Encoding\":[]string{\"gzip\"}, \"Content-Length\":[]string{\"1749\"}, \"Content-Type\":[]string{\"application/json\"}, \"User-Agent\":[]string{\"kube-apiserver-admission\"}}, Body:(*http.body)(0xc0037adb40), GetBody:(func() (io.ReadCloser, error))(nil), ContentLength:1749, TransferEncoding:[]string(nil), Close:false, Host:\"webhook.mink-system.svc:443\", Form:url.Values(nil), PostForm:url.Values(nil), MultipartForm:(*multipart.Form)(nil), Trailer:http.Header(nil), RemoteAddr:\"192.168.65.3:49146\", RequestURI:\"/config-validation?timeout=10s\", TLS:(*tls.ConnectionState)(0xc0022336b0), Cancel:(<-chan struct {})(nil), Response:(*http.Response)(nil), ctx:(*context.cancelCtx)(0xc0037adb80)}","commit":"6fd8a62"},
  {"level":"info","ts":"2020-07-07T18:56:36.504Z","logger":"controller","caller":"webhook/admission.go:104","msg":"AdmissionReview for v1.GroupVersionKind{Group:\"\", Version:\"v1\", Kind:\"ConfigMap\"}: mink-system/leader-elect-external response={ UID: \"\", Allowed: true, Status: (*v1.Status)(nil), Patch: , PatchType: , AuditAnnotations: map[string]string(nil)}","commit":"6fd8a62","knative.dev/kind":"/v1, Kind=ConfigMap","knative.dev/namespace":"mink-system","knative.dev/name":"leader-elect-external","knative.dev/operation":"UPDATE","knative.dev/resource":"/v1, Resource=configmaps","knative.dev/subresource":"","knative.dev/userinfo":"{system:serviceaccount:mink-system:controller dc0c307a-78be-4d7b-a3a6-c603dc74d640 [system:serviceaccounts system:serviceaccounts:mink-system system:authenticated] map[]}"},
];

storiesOf('Structured Logs', module)
  .addParameters({  docs: { iframeHeight: 600 }})
  .add('default', () => ({
  props: {
    logs: object('Logs', logs),
  },
  component: StructuredLogsComponent,
  template: `
      <div class="main-container">
          <div class="content-container">
              <div class="content-area">
                <app-structured-logs [logs]="logs">
                </app-structured-logs>
              </div>
          </div>
      </div>
      `,
}));
