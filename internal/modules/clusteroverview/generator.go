/*
Copyright (c) 2019 VMware, Inc. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

package clusteroverview

import (
	"context"

	gen "github.com/vmware/octant/internal/generator"
	"github.com/vmware/octant/pkg/view/component"
)

type generator struct{}

var _ gen.Generator = (*generator)(nil)

func (generator) Generate(ctx context.Context, path, prefix, namespace string, opts gen.Options) (component.ContentResponse, error) {
	panic("implement me")
}

